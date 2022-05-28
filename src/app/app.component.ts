import { Component, OnInit, VERSION } from '@angular/core';
import { from, map, of, tap } from 'rxjs';

type Person = {
  firstName: string,
  lastName: string
}

type PersonDto = {
  fullName: string
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  people: Person[]=[
    {firstName: "FN1", lastName: "LN1"},
    {firstName: "FN2", lastName: "LN2"}
  ];

  constructor(){
    from(this.people).pipe(tap((n) => console.log(n)));
  }
  ngOnInit(): void {
    of(this.people).pipe(      
      map(ps => ps.map(p=>({
        fullName: p.firstName+' '+p.lastName
      } as PersonDto))))
    .subscribe(
      p => console.log(JSON.stringify(p))
    );
  }
}
