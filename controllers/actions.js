class Client  {

    constructor(session) {
        this.session = session;
    }

    clientLoggedId() {
        return this.__sessionsExists() && this.__clientIsValid();
    }

    __sessionsExists() {
        return (
            this.session.client !== undefined && 
            trim(this.session.client) !== ""
        );
    }

    __clientIsValid() {
        return false;
    }
}


class Assets {

    booked() {
      return false;  
    }
}


module.exports = { Client };
