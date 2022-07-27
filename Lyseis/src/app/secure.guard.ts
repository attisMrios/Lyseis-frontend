import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecureService } from './secure.service';

@Injectable({
	providedIn: 'root'
})
export class SecureGuard implements CanActivate {

	constructor(private secureService: SecureService, public router: Router) {
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.secureService.isLoggedIn();
	}

	canLoad() {
		return this.secureService.isLoggedIn();
	}
}
