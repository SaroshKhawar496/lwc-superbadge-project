import { LightningElement, wire } from 'lwc';

// ...
const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';

import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { publish, MessageContext } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';

export default class BoatSearchResults extends LightningElement {
  selectedBoatId;
  columns = [];
  boatTypeId = '';
  boats;
  isLoading = false;
  
  // wired message context
  @wire(MessageContext)
  messageContext;
  // wired getBoats method 
  @wire (getBoats, {
    boatTypeId:  '$boatTypeId'
  })
  wiredBoats({error, data}) {
      if(data){
        console.log('data');
        this.boats = data;

      }else if (error){
          console.log('error: ', error);
      }
   }

  // public function that updates the existing boatTypeId property
  // uses notifyLoading
  searchBoats(boatTypeId) { }
  
  // this public function must refresh the boats asynchronously
  // uses notifyLoading
  refresh() { }
  
  // this function must update selectedBoatId and call sendMessageService
  updateSelectedTile(event) { 
      this.selectedBoatId = event.detail.boatId;
      this.sendMessageService(this.selectedBoatId);
  }
  
  // Publishes the selected boat Id on the BoatMC.
  sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
    publish(this.messageContext, BOATMC, {recordId: boatId})
  }
  
  // The handleSave method must save the changes in the Boat Editor
  // passing the updated fields from draftValues to the 
  // Apex method updateBoatList(Object data).
  // Show a toast message with the title
  // clear lightning-datatable draft values
  handleSave(event) {
    // notify loading
    const updatedFields = event.detail.draftValues;
    // Update the records via Apex
    updateBoatList({data: updatedFields})
    .then(() => {})
    .catch(error => {})
    .finally(() => {});
  }
  // Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isLoading) { }
}
