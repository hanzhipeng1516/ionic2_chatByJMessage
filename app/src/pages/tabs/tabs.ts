import { Component } from '@angular/core';

import {ChatHomePage} from "../chat/chatHome/chatHome";
import {ContactsList} from "../contacts/contactsList/contactsList";
import {fnHome} from "../function/fnHome/fnHome";
import {accountHome} from "../account/accountHome/accountHome";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChatHomePage;
  tab2Root: any = ContactsList;
  tab3Root: any = fnHome;
  tab4Root: any = accountHome;

  constructor(
  ) {
  }
}
