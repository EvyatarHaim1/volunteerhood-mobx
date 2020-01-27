import { observable, action } from "mobx";
import axios from 'axios';
import {HelpRequest} from './HelpRequest'

export class RequestsBoard {
    @observable feed = []
    @observable left = false
    
    @action async getFeed() {
		let response = await axios.get('http://localhost:8080/feed');
		this.feed = response.data[0]
	}

    acceptReq = (reqId, helperId) => {
		axios.put(`http://localhost:8080/feed/${reqId}/${helperId}`)
    }
    
    addNewRequest = async (id, obj) => {
        console.log(obj)
        // console.log(id)
		let newRequest = new HelpRequest(
            id, obj.description, obj.skill, obj.date
        )
        await axios.post(`http://localhost:8080/feed`, newRequest)
        this.getFeed()
	}	
}