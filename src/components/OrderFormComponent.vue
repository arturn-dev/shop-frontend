<template>
  <div>
    <h3>Contact information</h3>
    <form>
      <div class="form-group">
        <label class="col-sm-4 col-form-label" for="inputUsername">Username</label>
        <div class="col-sm-4">
          <input 
            type="text"
            id="inputUsername" 
            class="form-control" 
            placeholder="Enter your username"
            v-model="username"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-4 col-form-label" for="inputEmail">Email address</label>
        <div class="col-sm-4">
          <input 
            type="text"
            id="inputEmail" 
            class="form-control" 
            placeholder="Enter your email address"
            v-model="email"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-4 col-form-label" for="inputTelNumber">Phone number</label>
        <div class="col-sm-4">
          <input 
            type="text" 
            id="inputTelNumber"
            class="form-control"
            placeholder="Enter your phone number"
            v-model="telNumber"
            required
          />
        </div>
      </div>
      <div 
          class="alert alert-danger" 
          role="alert" 
          v-if="validationErrMsgs.length != 0">
        <span v-for="msg in validationErrMsgs" :key="msg">
          {{msg}}<br/>
        </span>
      </div>
      <div class="form-group row">
        <input type="button" 
                class="btn btn-info col-sm-4" 
                value="Order" 
                @click="verifyOrder"/>
        </div>
    </form>
    <div
        class="alert alert-danger"
        role="alert"
        v-if="serverErrMsg != ''">
      {{serverErrMsg}}
    </div>
  </div>
</template>

<script>
import Consts from '../consts';
import order from '../order';
import axios from 'axios';

export default {
  name: 'OrderFormComp',
  data: function() {
    return {
      username: '',
      email: '',
      telNumber: '',
      validationErrMsgs: [],
      serverErrMsg: ''
    }
  },
  methods: {
    verifyOrder: function() {
      this.validationErrMsgs = [];

      if (this.username == undefined || this.username == '')
        this.validationErrMsgs.push("- Username mustn't be empty");
      else if (this.username.match("^[a-zA-Z0-9_]{3,50}$") == undefined)
        this.validationErrMsgs.push("- Username must be between 3 to 50 characters long and can only contain letters, numbers and '_' character");

      if (this.email == undefined || this.email == '')
        this.validationErrMsgs.push("- Email mustn't be empty");
      else if (this.email.match("^[a-zA-Z0-9_]+@[a-z]+.[a-z]+$") == undefined)
        this.validationErrMsgs.push("- Email must be in form of 'user@example.com'");

      if (this.telNumber == undefined || this.telNumber == '')
        this.validationErrMsgs.push("- Telephone number mustn't be empty");
      else if (this.telNumber.match("^[0-9]{9}$") == undefined)
        this.validationErrMsgs.push("- Telephone number should contain only 9 digits");

      if (order.order.products.length == 0) {
        this.validationErrMsgs.push("- You need to order at least one product to make an order");
      }

      if (order.order.products.some((product) => product.amount <= 0)) {
        this.validationErrMsgs.push("- Amount of every product must be greater than 0");
      }

      if (this.validationErrMsgs.length != 0)
        return;


      order.order.username = this.username;
      order.order.email = this.email;
      order.order.telNumber = this.telNumber;
      this.sendOrder();
    },
    sendOrder: function() {
      var self = this;
      axios
        .post(Consts.backendUrl + '/orders', {
          'order': order.order
        })
        .then(res => {
          if (res.data.error) {
            self.serverErrMsg = res.data.data.message;
          } else {
            this.validationErrMsgs = [];
            this.serverErrMsg = '';
            order.order = JSON.parse(JSON.stringify(order.emptyOrder));
            this.$emit('order-successful-event');

            console.log('Order send res: ', res);
          }
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style>

</style>