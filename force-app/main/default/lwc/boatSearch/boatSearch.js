 // imports
 import { LightningElement } from "lwc";
 export default class BoatSearch extends LightningElement {
    isLoading = false;
    
    // Handles loading event
    handleLoading() { }
    
    // Handles done loading event
    handleDoneLoading() { }
    
    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { 
      console.log('in boatSerach.js caught event');
      console.log('event.detail', event.detail.boatTypeId);
    }
    
    createNewBoat() { }
  }
  