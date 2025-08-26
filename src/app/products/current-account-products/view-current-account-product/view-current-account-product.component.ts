/** Angular Imports */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Components */
import { STANDALONE_SHARED_IMPORTS } from 'app/standalone-shared.module';
import { MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
  selector: 'mifosx-view-current-account-product',
  templateUrl: './view-current-account-product.component.html',
  styleUrls: ['./view-current-account-product.component.scss'],
  imports: [
    ...STANDALONE_SHARED_IMPORTS,
    MatCardTitle,
    MatCardContent,
    MatCardActions
  ]
})
export class ViewCurrentAccountProductComponent {
  currentAccountProduct: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe((data: { currentAccountProduct: any }) => {
      this.currentAccountProduct = data.currentAccountProduct;
    });
  }
}
