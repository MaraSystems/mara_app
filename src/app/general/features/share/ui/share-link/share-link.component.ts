import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/client/utils/models/client';
import { ListClientsAction } from 'src/app/client/utils/store/client-store.action';
import { selectAllClients, selectSearchedClients } from 'src/app/client/utils/store/client-store.selector';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.scss']
})
export class ShareLinkComponent extends UnSubscriber implements OnInit {
  @Input() link!: string;
  @Output() shareTo = new EventEmitter<string[]>();

  control = new FormControl();
  text = 'Copy Link';
  clients: Client[] = [];
  selectedClients: Set<string> = new Set();
  query = '';

  constructor(
    public store: Store
  ) {
    super();
   }

  ngOnInit(): void {
    this.newSubscription = this.control.valueChanges.subscribe(data => {
      this.searchUsers(data);
    });
  }

  searchUsers(query: any) {    
    this.query = query;
    this.store.dispatch(new ListClientsAction());
    this.newSubscription = this.store.select(selectAllClients).subscribe(clients => {
      this.clients = clients;      
    });
  }

  toggleClient(id: string) {
    this.selectedClients.has(id)
      ? this.selectedClients.delete(id)
      : this.selectedClients.add(id);
  }

  copy() {
    navigator.clipboard.writeText(`${location.origin}/${this.link}`);
    this.text = 'Link Copied';

    setTimeout(() => {
      this.text = 'Copy Link';
    }, 1000);
  }

  shareLink(search: HTMLInputElement) {    
    const list = Array.from(this.selectedClients);
    if (list.length) {
      this.shareTo.emit(list);      
      this.selectedClients.clear();
      this.control.reset();
      search.value = '';
    }
  }
}
