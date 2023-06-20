// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
  string public name;
  uint public productCount;
  mapping(uint => Product) public products;

  struct Product {
    uint id;
    string name;
    uint price;
    address owner;
    string img;
    bool purchased;
  }

  event ProductCreated (
    uint id,
    string name,
    uint price,
    address owner,
    string img,
    bool purchased
  );

  event ProductPurchased (
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  constructor() {
    name = "DApp University Marketplace";
    productCount = 0;

    createProduct("Macbook air", 5, './mac.jpeg');
    createProduct("IPhone 12", 10, './iphone.png');
    createProduct("Air Jordan 1", 50, './shoes.jpeg');
    createProduct("Nautilus 5711/1A-018", 80, './watch.jpg');
  }

  // 單位：Ether
  function createProduct(string memory _name, uint _price, string memory _img) public {
    _price = _price * 1 ether;
    require(bytes(_name).length > 0);
    require(bytes(_img).length > 0);
    require(_price > 0);
    productCount ++;

    // Create the product
    products[productCount] = Product(productCount, _name, _price, msg.sender, _img, false);
    emit ProductCreated(productCount, _name, _price, msg.sender, _img, false);
  }

  // 單位：wei
  function purchaseProduct(uint _id) public payable {
    Product storage _product = products[_id];
    address payable _seller = payable(_product.owner);

    require(_product.id > 0 && _product.id <= productCount, "Invalid product ID");
    require(msg.value >= _product.price, "Insufficient funds");
    require(!_product.purchased, "Product not available");
    require(_seller != msg.sender);

    _product.owner = msg.sender;
    _product.purchased = true;
    products[_id] = _product;
    _seller.transfer(msg.value);

    emit ProductPurchased(productCount, _product.name, _product.price, payable(msg.sender), true);
  }
}