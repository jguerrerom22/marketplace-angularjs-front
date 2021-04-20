import { Component, OnInit } from "@angular/core";
import { UserlogService } from "../../../shared/userlog.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu-studio",
  templateUrl: "./menu-studio.component.html",
  styleUrls: ["./menu-studio.component.sass"],
})
export class MenuStudioComponent implements OnInit {
  menuData = [
    {
      sector: 1,
      menu: [
        {
          name: "accounts",
          icon: "icofont-users-alt-2",
          route: "/studio/userSettings",
        },
        // {
        //   name: "stories",
        //   icon: "icofont-magic",
        //   route: "/studio/manageStories",
        // },
        {
          name: "posts",
          icon: "icofont-newspaper",
          route: "/studio/managePosts",
        },
      ],
    },
    {
      sector: 2,
      menu: [
        {
          name: "mystore",
          icon: "icofont-home",
          route: "/commerce/shop/5f052d87f375cb6b40b50df0",
        },
        {
          name: "products",
          icon: "icofont-box",
          route: "/studio/manageItems/products",
        },
        { 
          name: "services", 
          icon: "icofont-ui-chat", 
          route: "/studio/manageItems/services",
        },
      ],
    },
    {
      sector: 3,
      menu: [
        { name: "usermessages", icon: "icofont-bag", route: "" },
        { name: "usersettings", icon: "icofont-settings", route: "/studio/accountSetup" },
      ],
    },
  ];

  constructor(public userlog: UserlogService, public router: Router) {}

  ngOnInit(): void {}
}
