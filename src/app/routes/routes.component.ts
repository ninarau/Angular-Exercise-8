import {Component, OnInit} from '@angular/core';
import {DigitransitService} from "../services/digitransit.service";
import {tryCatch} from "rxjs/util/tryCatch";
import {Router} from "@angular/router";
import any = jasmine.any;

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  private routes: any = [];
  private user: any = {};
  private key: string = 'AIzaSyCHIVY0i3gWbOxw6tXlZDIToBSc01ja1q4';
  private time: any = Date.now();

  constructor(private digitransitService: DigitransitService, private router: Router) {
  }

  ngOnInit() {
    if(localStorage.getItem('user') === null) {
      this.router.navigate(['setup']);
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.digitransitService.setStop(this.user.stop);
      this.digitransitService.getRoutes().subscribe(
        (res) => {
          console.log(res.data.stops[0].patterns);
          this.routes = res.data.stops[0].patterns;
          this.routes.map((reitti) => {
            reitti.route.gtfsId = reitti.route.gtfsId.replace('HSL:', '');
          });
        }
      )
    }
  }

  showBus = (line: string) => {
    console.log(line);
    this.digitransitService.getBus(line).subscribe(
      (resp) => {
        console.log(resp);
        // console.log(resp[Object.keys(resp)[0]].VP.long);
        try {
          const lat = resp[Object.keys(resp)[0]].VP.lat;
          const lon = resp[Object.keys(resp)[0]].VP.long;
          this.time = resp[Object.keys(resp)[0]].VP.tst;
          window.open(`https://www.google.com/maps/embed/v1/place?key=${this.key}&q=${lat},${lon}`, "mappi"
);
        } catch (e) {
          alert('Not in transit.');
        }
      }
    )
  };

  removeUser = () => {
    localStorage.removeItem('user');
    this.router.navigate(['setup'])
  }

}
