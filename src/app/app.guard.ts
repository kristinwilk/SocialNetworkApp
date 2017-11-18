import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {MainServiceService} from "./main-service.service";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router:Router,private service : MainServiceService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.service.auth())
      this.router.navigate(['/signIn']);
    return !this.service.auth();
  }
}
