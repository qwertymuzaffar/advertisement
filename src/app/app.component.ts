import {Component, ViewChild, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {AuthToken} from '../services/auth.token.service';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  /*----------------------------------------------------------------------------------------------------
   ------------------------------------------------------------------------------------------------------

   Public variables

   ------------------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------------*/

  model:any = {};
  error:string = '';
  message:string = '';
  subFilter:boolean = false;
  subFilterButton = false;
  listViewMode:boolean = true;
  gridViewMode:boolean = false;

  /*----------------------------------------------------------------------------------------------------
   ------------------------------------------------------------------------------------------------------

   Private variables

   ------------------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------------*/

  private signinSub:Subscription;
  private signupSub:Subscription;

  /**
   * @constructor
   * @param router
   * @param userService
   * @param authToken
   * @param authService
   * @param renderer
   */
  constructor(private router: Router,
              private userService: UserService,
              private authToken: AuthToken,
              private authService: AuthService,
              private renderer: Renderer2) {}

  /**
   * @ViewChild
   */
  @ViewChild('signInContainer')
  signInContainer:any;

  @ViewChild('signUpContainer')
  signUpContainer:any;

  @ViewChild('signInForm')
  signInForm:any;

  @ViewChild('signUpForm')
  signUpForm:any;

  /*----------------------------------------------------------------------------------------------------
  ------------------------------------------------------------------------------------------------------

  Private Functions

  ------------------------------------------------------------------------------------------------------
  ----------------------------------------------------------------------------------------------------*/

  /**
   * Zoom out sign in and up forms
   * @param elem
   */
  private setZoomOut(form:string): void {
    if(form === 'signInContainer') {
      console.log(this.signInForm);
      // this.renderer.addClass(this.signInForm, 'animate-zoom-out');
    }else {
      this.renderer.addClass(this.signUpForm, 'animate-zoom-out');
    }
    setTimeout(() => {
      this.renderer.setStyle(this[form].nativeElement, 'display', 'none');
    }, 250);
  }

  /*----------------------------------------------------------------------------------------------------
   ------------------------------------------------------------------------------------------------------

   Public Functions

   ------------------------------------------------------------------------------------------------------
   ----------------------------------------------------------------------------------------------------*/

  /**
   * Checking user sign in
   * @returns {boolean}
   */
  isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  /**
   * Open sing in or up form
   * @param form
   */
  openForm(form:string): void {
    this.renderer.setStyle(this[form].nativeElement, 'display', 'block');
    // if(form == 'signInContainer') {
    //   this.renderer.removeClass(this.signInForm.nativeElement, 'animate-zoom-out');
    // }
    //
    // if(form === 'signUpContainer') {
    //   this.renderer.removeClass(this.signUpForm.nativeElement, 'animate-zoom-out');
    // }
    // this[form].nativeElement.style.display = "block";
  }

  /**
   * Closing sign in or up form
   * @param form
     */
  closeForm(form:string): void {
    this.setZoomOut(form);
    this.model = {};
  }

  /**
   * Sub-filter active
   * @returns {boolean}
   */
  subFilterActive(): boolean {
    return this.subFilter = !this.subFilter;
  }

  /**
   *
   * @param viewMode
   */
  onViewModeChange(viewMode:string): void {
    if(viewMode == 'gridView') {
      this.listViewMode = false;
      this.gridViewMode = true;
    }else {
      this.gridViewMode = false;
      this.listViewMode = true;
    }
  }

  /**
   * Sign in
   */
  signIn(): void {
    this.signinSub = this.authService.signIn(this.model)
      .subscribe((res:any) => {
        if(res.success) {
          this.model = {};
          // this.signInContainer.nativeElement.style.display = "none";
          this.renderer.setStyle(this.signInContainer.nativeElement, 'display', 'none');
          this.authToken.setToken(res.token);
          this.router.navigate(['/user']);
        }else {
          this.error = res.message;
        }
      })
  }

  /**
   * Sign up
   */
  signUp(): void {
    this.signupSub = this.authService.signUp(this.model)
      .subscribe((res:any) => {
        if(res.success) {
          this.model = {};
          // this.signUpContainer.nativeElement.style.display = "none";
          this.renderer.setStyle(this.signUpContainer.nativeElement, 'display', 'none');
          this.authService.signIn(res.userData)
            .subscribe((res:any) => {
              if(res.success) {
                this.authToken.setToken(res.token);
                this.router.navigate(['/user']);
              }else {
                this.error = res.message;
              }
            })
        }else {
          this.error = res.message;
        }
      })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.signinSub.unsubscribe();
    this.signupSub.unsubscribe();
    this.userService.logout();
    this.model = {};
  }

}
