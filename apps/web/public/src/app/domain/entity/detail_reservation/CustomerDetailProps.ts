export default class CustomerDetailProps {
    orgName: string;
    orgProjectName: string;
    orgAddress: string;
    orgEmail: string;
    orgPhone: string;
    orgFax: string;

    constructor(
        orgName: string = '',        
        orgProjectName: string = '',
        orgAddress: string = '',
        orgEmail: string = '',
        orgPhone: string = '',
        orgFax: string = ''
    ) {
        this.orgName = orgName;
        this.orgProjectName = orgProjectName;
        this.orgAddress = orgAddress;
        this.orgEmail = orgEmail;
        this.orgPhone = orgPhone;
        this.orgFax = orgFax;
    }

    formatPhone(): string {
        return this.orgPhone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
}
