import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal(<boolean>false);


  public isLoading = this.loading.asReadonly();


  public setLoading(value : boolean){
    this.loading.set(value);
  }

}
