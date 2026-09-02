import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  finalize
} from 'rxjs';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import {
  CustomerService
} from '../services/customerService';
import { NewCustomerM } from '../model/customer.model';


@Component({
  selector: 'app-new-customer',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './new-customer.html',

  styleUrl: './new-customer.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush
})
export class NewCustomer {

  private readonly fb =
    inject(FormBuilder);

  private readonly customerService =
    inject(CustomerService);

  private readonly router =
    inject(Router);

  private readonly destroyRef =
    inject(DestroyRef);


  readonly saving =
    signal(false);

  readonly errorMessage =
    signal<string | null>(null);


  readonly customerForm =
    this.fb.nonNullable.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(120)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ]

    });


  saveCustomer(): void {

    if (
      this.customerForm.invalid
      || this.saving()
    ) {

      this.customerForm.markAllAsTouched();

      return;
    }


    const customer: NewCustomerM =
      this.customerForm.getRawValue();


    this.saving.set(true);

    this.errorMessage.set(null);


    this.customerService
      .createCustomer(customer)
      .pipe(

        finalize(() =>
          this.saving.set(false)
        ),

        takeUntilDestroyed(
          this.destroyRef
        )

      )
      .subscribe({

        next: () => {

          this.router.navigateByUrl(
            '/customers'
          );

        },

        error: error => {

          console.error(
            'Erreur création client :',
            error
          );

          this.errorMessage.set(
            'Impossible de créer le client.'
          );

        }

      });

  }

}
