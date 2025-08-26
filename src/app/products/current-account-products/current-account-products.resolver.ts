/** Angular Imports */
import { Injectable } from '@angular/core';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from '../products.service';

/**
 * Current account products data resolver.
 */
@Injectable({ providedIn: 'root' })
export class CurrentAccountProductsResolver {
  /**
   * @param {ProductsService} productsService Products service.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the current account products data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.productsService.getCurrentAccountProducts();
  }
}
