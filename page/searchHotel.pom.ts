import { WebControl } from "../core/webControl.core";
import { Page, expect } from "@playwright/test";
import { MethodBase } from "./methodBase.pom";


export class SearchHotelPage extends MethodBase {

    constructor(page: Page) {
        super(page);
    }

    locationDrpdwn = new WebControl(this.page.locator('#location'), 'location Dropdown');
    hotelsDrpdwn = new WebControl(this.page.locator('#hotels'), 'hotels Dropdown');
    room_typeDrpdwn = new WebControl(this.page.locator('#room_type'), 'room_type Dropdown');
    room_nosDrpdwn = new WebControl(this.page.locator('#room_nos'), 'room_nos Dropdown');
    checkInDateTxtbx = new WebControl(this.page.locator('#datepick_in'), 'Check In date textbox');
    checkoutDateTxtbx = new WebControl(this.page.locator('#datepick_out'), 'Check Out date textbox');
    adult_roomDrpdwn = new WebControl(this.page.locator('#adult_room'), 'adult_room Dropdown');
    child_roomDrpdwn = new WebControl(this.page.locator('#child_room'), 'child_room Dropdown');
    searchBtn = new WebControl(this.page.locator("#Submit"), 'Search button');
    resetBtn = new WebControl(this.page.locator("#Reset"), 'Reset button');
    locationLabel = new WebControl(this.page.locator("#location_1"), "location column");
   
    public async enterDataInSearchHotel(location: string, hotels: string, roomType: string, noOfRooms: string, 
        checkInDate: string, checkoutDate: string, adultPerRoom:string, childPerRoom:string)
    {
        if(location!="")
            await this.selectFromDropdownByValue(this.locationDrpdwn, location);
        if(hotels!="")    
            await this.selectFromDropdownByValue(this.hotelsDrpdwn, hotels);
        if(roomType!="")
            await this.selectFromDropdownByValue(this.room_typeDrpdwn, roomType);
        if(noOfRooms!="")
            await this.selectFromDropdownByValue(this.room_nosDrpdwn, noOfRooms);
        if(checkInDate!="")
            await this.type(this.checkInDateTxtbx, checkInDate);
        if(checkoutDate!="")
            await this.type(this.checkoutDateTxtbx, checkoutDate);
        if(adultPerRoom!="")
            await this.selectFromDropdownByValue(this.adult_roomDrpdwn, adultPerRoom);
        if(adultPerRoom!="")
            await this.selectFromDropdownByValue(this.locationDrpdwn, adultPerRoom);
        await this.click(this.searchBtn);
    }

    public async verifySearchedHotel(city: string)
    {
        await this.verifyAttributeValue(this.locationLabel, 'value', city);
    } 


}
