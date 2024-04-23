export const upload = (file: any) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        resolve(reader.result as string);
    }
});