import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ClientPageComponent implements OnInit {
  clientModelObject: Client = new Client();

  clientDialog?: boolean;

  clientList: Client[] = [];

  client?: Client;

  submitted?: boolean;

  statuses?: any[];

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  openNew() {
    this.client = {};
    this.submitted = false;
    this.clientDialog = true;
  }

  editClient(client: Client) {
    this.client = { ...client };
    this.clientDialog = true;
  }

  deleteClient(client: Client) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + client.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeClient(client.id);
        this.client = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.client.name !== undefined) {
      if (
        this.client.name.trim() &&
        this.client.code &&
        this.client.duration &&
        this.client.numberOfAccounts &&
        this.client.dateOfCreation
      ) {
        if (this.client.id) {
          this.updateClient();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Updated',
            life: 3000,
          });
        } else {
          this.addClient();
          this.clientList.push(this.client);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Created',
            life: 3000,
          });
        }

        this.clientList = [...this.clientList];
        this.clientDialog = false;
        this.client = {};
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.clientList.length; i++) {
      if (this.clientList[i].id.toString() === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((data) => {
      this.clientList = data;
    });
  }

  addClient() {
    this.clientService.postClient(this.client).subscribe((res) => {
      console.log(res);
      this.getAllClients();
    });
  }

  updateClient() {
    this.clientService
      .updateClient(this.client, this.client.id)
      .subscribe((res) => {
        console.log(res);
        this.getAllClients();
      });
  }

  removeClient(id: number) {
    this.clientService.deleteClient(id).subscribe((res) => {
      this.getAllClients();
    });
  }
}
