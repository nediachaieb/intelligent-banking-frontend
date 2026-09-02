import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';

import {
  AsyncPipe
} from '@angular/common';

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
  catchError,
  finalize,
  of
} from 'rxjs';

import {
  takeUntilDestroyed
} from '@angular/core/rxjs-interop';

import {
  AccountStatus,
  AccountType,
  NewAccount
} from '../model/account.model';

import {
  AccountService
} from '../services/accountService';

import {
  CustomerService
} from '../services/customerService';


@Component({
  selector: 'app-new-account',

  standalone: true,

  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './new-account.html',

  styleUrl: './new-account.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush
})
export class NewAccountComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly accountService =
    inject(AccountService);

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


  readonly customerLoadError =
    signal<string | null>(null);


  readonly customers$ =
    this.customerService
      .getAllCustomers()
      .pipe(

        catchError(error => {

          console.error(
            'Erreur chargement clients :',
            error
          );

          this.customerLoadError.set(
            'Impossible de charger les clients.'
          );

          return of([]);

        })

      );


  readonly accountForm =
    this.fb.nonNullable.group({

      balance: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      currency: [
        'TND',
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ],

      type: [
        'CURRENT_ACCOUNT' as AccountType,
        [
          Validators.required
        ]
      ],

      status: [
        'CREATED' as AccountStatus,
        [
          Validators.required
        ]
      ],

      customerId: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ]

    });


  saveAccount(): void {

    if (
      this.accountForm.invalid
      || this.saving()
    ) {

      this.accountForm.markAllAsTouched();

      return;

    }


    const account: NewAccount =
      this.accountForm.getRawValue();


    this.saving.set(true);

    this.errorMessage.set(null);


    this.accountService
      .createAccount(account)
      .pipe(

        finalize(() => {

          this.saving.set(false);

        }),

        takeUntilDestroyed(
          this.destroyRef
        )

      )
      .subscribe({

        next: () => {

          this.router.navigateByUrl(
            '/accounts'
          );

        },

        error: error => {

          console.error(
            'Erreur création compte :',
            error
          );

          this.errorMessage.set(
            'Impossible de créer le compte.'
          );

        }

      });

  }

}
