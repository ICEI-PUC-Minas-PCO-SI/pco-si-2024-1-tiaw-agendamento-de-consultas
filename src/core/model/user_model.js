export class UserModel {
    constructor(credential, name, lastName, email, phone, document, address, parentName, parentDocument) {
        this.credential= credential;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.document = document;
        this.address = address;
        this.parentName = parentName;
        this.parentDocument = parentDocument;
    }

    toJson = () =>
        JSON.stringify(Object.entries(this));

    fromJson = (data) => {
        const json = JSON.parse(data);
        return new UserModel(json["credential"], json["name"], json["lastName"], json['email'], json['phone'], json['document'], AddressModel.fromJson(json['address']), json['parentName'], json['parentDocument']);
    }

}

export class AddressModel {
    constructor(address, number, complement, city, state) {
        this.number = number;
        this.complement = complement;
        this.city = city
        this.address = address;
        this.state = state;
    }

    toJson = () =>
        JSON.stringify(Object.entries(this));

    static fromJson = (json) => {
        return new AddressModel(json['address'], json['number'], json['complement'], json['city'], json['state']);
    }
}