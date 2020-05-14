import { Component, VERSION, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription = new Subscription();
  private readonly listOfNames: string[] = [
    'Sophia',
    'Jacob',
    'Scott',
    'Olivia',
    'Emma'
  ];

  public searchControl: FormControl = new FormControl('');
  public readonly dataSource$: BehaviorSubject<string[]> = new BehaviorSubject(this.listOfNames);


  ngOnInit() {
    const searchControl$ = this.searchControl.valueChanges
      .pipe(
        map((searchKey: string) => {
          if(!searchKey) {
            return this.listOfNames;
          }

          return this.listOfNames.filter(name => name.toLocaleLowerCase()
            .includes(searchKey.toLocaleLowerCase()));
        })
      )
      .subscribe(filteredResult => {
        this.dataSource$.next(filteredResult);
      });

    this.subscriptions.add(searchControl$);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
