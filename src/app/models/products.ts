export class Products {
  constructor(_id: string,
    _imgurl: string,
    _productName: string,
    _description: string,
    _price: number,
    _houseType: string,
    _productTypeId: string,
    _houseSize: number,
    _howManyRoom: number,
    _houseFloor: number,
    _houseAge: number,
    _adress: string,
    _userId: string,)
  {
    this.id = _id;
    this.imgurl = _imgurl;
    this.productName = _productName;
    this.description = _description;
    this.price = _price;
    this.houseTypeId = _houseType;
    this.productTypeId = _productTypeId;
    this.houseSize = _houseSize;
    this.howManyRoom = _howManyRoom;
    this.houseFloor = _houseFloor;
    this.houseAge = _houseAge;
    this.adress = _adress;
    this.userId = _userId;
  }
  id!: string;
  imgurl!: string;
  productName!: string;
  description!: string;
  price!: number;
  houseTypeId!: string;
  productTypeId!: string;
  houseSize!: number;
  howManyRoom!: number;
  houseFloor!: number;
  houseAge!: number;
  adress!: string;
  userId!: string;
}
