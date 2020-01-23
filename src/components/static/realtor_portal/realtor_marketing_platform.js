import React, {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class RealtorMarketingPlatform extends Component{
  _isMounted = false
  render(){
    return(
      <div className="tab-pane show active">
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>
        <Accordion >
          <div>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <div>
              <p>
              </p>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    )
  }
}
