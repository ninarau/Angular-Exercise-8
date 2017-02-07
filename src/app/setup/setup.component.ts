import {Component, OnInit} from '@angular/core';
import {DigitransitService} from "../services/digitransit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})

export class SetupComponent implements OnInit {

  private user: any = '';
  private key: string = 'AIzaSyCHIVY0i3gWbOxw6tXlZDIToBSc01ja1q4';
  private url: string = `https://www.google.com/maps/embed/v1/view?key=${this.key}&center=60.221423,24.806294`

  constructor(private digitransitService: DigitransitService, private router: Router) {
  }

  setPreferences = (formValues: any) => {
    console.log(formValues);
    localStorage.setItem('user', JSON.stringify(formValues));
    this.router.navigate(['routes']);
  }

  ngOnInit() {
  }

}
