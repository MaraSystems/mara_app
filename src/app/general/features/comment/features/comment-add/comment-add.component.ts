import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/client/utils/models/client';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { CreateCommentAction } from '../../utils/store/comment-store.action';
import { Comment } from '../../utils/models/comment.model';
import { CommentEnum } from '../../utils/models/comment.enum';
import { upload } from 'src/app/general/utils/lib/upload';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent extends UnSubscriber implements OnInit {
  @Input() model!: CommentEnum;
  @Input() modelId = '';

  client!: Client;
  form!: FormGroup;
  comment!: Comment;

  constructor(
    public store: Store
  ){
    super();
  }
  
  ngOnInit(): void {
    this.initForm();

    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.client = client;
      this.form.get('userId')?.setValue(this.client._id);
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.comment = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      statement: new FormControl(),
      attachment: new FormControl(),
      userId: new FormControl()
    })
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  getControl(name: string) {
    const control = this.form.get(name) as FormControl;    
    return control;
  }

  send() {                
    if(!this.comment?.attachment && !this.comment?.statement) {
      return;
    }    

    this.store.dispatch(new CreateCommentAction({ ...this.comment, model: this.model, modelId: this.modelId }));
    this.form.reset();
  }

  async setAttachment(event: any) {
    const files = Array.from(event.target.files);
    const dataList = await Promise.all(files.map(async (file: any) => upload(file)));    
    this.form.get('attachment')?.setValue(dataList[0]);
  }
}
