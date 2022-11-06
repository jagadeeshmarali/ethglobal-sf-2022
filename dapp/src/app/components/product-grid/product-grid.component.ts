import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  products = [
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Farweave.net%2FcKhNqEPVk-Ll51TvBCx5RPc5NvJUo45ZbIHfjDv83Cc&w=1920&q=75",
      title: "Bonorum et Malorum",
      url: "admin/ecom-product-detail",
      price: "$761.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Farweave.net%2Fjm6wD4dL6h-ngCdATOmufSbaYLXsAzCseyOveXnkYk8&w=1920&q=75",
      title: "Striped Dress",
      url: "admin/ecom-product-detail",
      price: "$159.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        }
      ]

    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Farweave.net%2FcKhNqEPVk-Ll51TvBCx5RPc5NvJUo45ZbIHfjDv83Cc&w=1920&q=75",
      title: "BBow polka-dot",
      url: "admin/ecom-product-detail",
      price: "$357.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Farweave.net%2FcKhNqEPVk-Ll51TvBCx5RPc5NvJUo45ZbIHfjDv83Cc&w=1920&q=75",
      title: "Z Product 360",
      url: "admin/ecom-product-detail",
      price: "$654.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Farweave.net%2Fg38wnbhXA2z-60HNH6qnaUm_CyRAntMTB1RFwkUO8zI&w=1920&q=75",
      title: "Chair Grey",
      url: "admin/ecom-product-detail",
      price: "$369.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Fbafybeicopqcbvgbwoooetedajjpvqzv7v7q6b4225rgr4sqehlfxgxwa2e.ipfs.nftstorage.link%2F7460.png%3Fext%3Dpng&w=1920&q=75",
      title: "fox sake withe",
      url: "admin/ecom-product-detail",
      price: "$245.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Fbafybeifge5aw4dynsfxl5n4rgde66djy7so4bjccxyvidjptqeq7ymoo4u.ipfs.nftstorage.link%2F9483.png%3Fext%3Dpng&w=1920&q=75",
      title: "Back Bag",
      url: "admin/ecom-product-detail",
      price: "$364.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },
    {
      image: "https://solanart.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdemo%2Fimage%2Ffetch%2Fh_500%2Fhttps%3A%2F%2Fbafybeihds3yzrk4vt6wyhhpxpyisyq2h6nygep6njwesdaeyt3hy5cf4wm.ipfs.nftstorage.link%2F9566.png%3Fext%3Dpng&w=1920&q=75",
      title: "FLARE DRESS",
      url: "admin/ecom-product-detail",
      price: "$548.00",
      ratings_class: [
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
        {
          icon_class: "fa fa-star-half-empty",
        },
      ]
    },




  ];

}
