import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/interfaces/auth-request';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { Seller } from 'src/app/interfaces/seller';
import { SellerService } from 'src/app/services/seller.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private sellerService: SellerService,
    private router: Router,
    private util: UtilService
  ) {
    if (localStorage.getItem('seller-token') != null) {
      this.router.navigate(['seller']);
    }
  }

  onSellerLogin(seller: Seller): void {
    // Clear tokens for other account types
    localStorage.removeItem('customer-jwt');
    localStorage.removeItem('customer-token');
    localStorage.removeItem('admin-jwt');
    localStorage.removeItem('admin-token');

    let req: AuthRequest = {
      email: seller.email,
      password: seller.password,
    };
    this.sellerService.sellerLogin(req).subscribe((res: AuthResponse) => {
      if (res.status == 'success') {
        localStorage.setItem('seller-jwt', res.token);
        localStorage.setItem('seller-token', JSON.stringify(res.user));
        // Décoder le JWT pour récupérer le rôle
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        const role = payload.role;
        if (role === 'SELLER') {
          this.router.navigate(['seller', 'dashboard']);
        } else if (role === 'CUSTOMER') {
          this.router.navigate(['customer']);
        } else if (role === 'ADMIN') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['']);
        }
        this.util.toastify(true, 'Successfully logged in');
      } else {
        this.util.toastify(false);
      }
    });
  }

  onSellerSignup(seller: Seller): void {
    seller.role = 'SELLER';
    this.sellerService.sellerSignup(seller).subscribe((seller: Seller) => {
      if (seller != null) {
        localStorage.setItem('seller-token', JSON.stringify(seller));
        this.router.navigate(['seller']);
        this.util.toastify(true, 'Registered successfully and logged in');
      } else {
        this.util.toastify(false);
      }
    });
  }
}
