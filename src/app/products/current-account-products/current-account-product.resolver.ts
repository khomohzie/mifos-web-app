/** Angular Imports */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from '../products.service';

/**
 * Current Account Product data resolver.
 */
@Injectable({ providedIn: 'root' })
export class CurrentAccountProductResolver {
  /**
   * @param {ProductsService} productsService Products service.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the current account product data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = route.paramMap.get('productId') || route.parent?.paramMap.get('productId');
    return this.productsService.getCurrentAccountProduct(productId!);
  }
}
