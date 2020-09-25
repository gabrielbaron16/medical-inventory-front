import { Component, OnInit } from '@angular/core';
import {Order, OrderToItem, UpdateOrder} from '../../../entities/order';
import {OrderService} from '../../../services/order/order.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert/alert.service';
import { Item } from 'src/app/entities/item';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  search = '';
  months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };
  isLoading = true;

  constructor(private service: OrderService, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getOrders()
      .subscribe(response => {
        this.isLoading = false;
        this.orders = response.body['data'];
        this.orders = this.orders.map(value => {
          const date = new Date(value.date);
          // @ts-ignore
          value.date = `${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`;
          return value;
        });
        console.log(this.orders);
      }, error => {
        this.isLoading = false;
        console.log(error.error);
        this.alertService.error('Error al Obtener los Pedidos', false);
      });
  }

  showItem(orderItem: OrderToItem): string {
    let itemDisplay = '';
    const item: Item = orderItem.item;
    itemDisplay = itemDisplay + orderItem.amount + ' unidades de ' +
        item.generalItem.name + ' ' +  item.brand.name + ' '
        + item.presentation.quantity + ' '+ item.presentation.name + ' '
        + item.presentation.measure_value+ ' ' + item.presentation.measure
    return itemDisplay;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  approveOrder(id: number) {
    this.alertService.clear();
    Swal.fire({
      title: 'Desea Aprobar el Pedido?',
      // text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        const update : UpdateOrder = {
          status: "aprobado"
        }
        this.service.updateOrder(update, id)
          .subscribe(response => {
            this.isLoading = false;
            this.reloadCurrentRoute();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El Pedido se ha Aprobado',
              showConfirmButton: false,
              timer: 1500
            });
          }, error => {
            console.log(error);
            this.alertService.error('Error al Aprobar el Pedido', false);
          });
      }
    });
  }
}
