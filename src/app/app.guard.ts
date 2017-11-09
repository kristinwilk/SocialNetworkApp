import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.checkIsAuthorized())
      this.router.navigate(['/signIn']);
    return this.checkIsAuthorized();
  }
  private checkIsAuthorized():boolean{
    return sessionStorage.getItem("email")!=null;
  }
}
