import { Location } from '@angular/common';
import {
    ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';

import { NavbarComponent } from './shared/navbar/navbar.component';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private renderer: Renderer2, private router: Router, private element: ElementRef, public location: Location) {}
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(() => {
        if (window.outerWidth > 991) {
          window.document.children[0].scrollTop = 0;
        } else {
          window.document.activeElement.scrollTop = 0;
        }
        this.navbar.sidebarClose();

        this.renderer.listen('window', 'scroll', () => {
          const number = window.scrollY;
          const location = this.location.path().split('/')[2];

          if (number > 150 || window.pageYOffset > 150) {
            navbar.classList.remove('navbar-transparent');
          } else if (location !== 'login' && this.location.path() !== '/nucleoicons') {
            // remove logic
            navbar.classList.add('navbar-transparent');
          }
        });
      });
  }
}
