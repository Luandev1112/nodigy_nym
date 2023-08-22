import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';

const AccordionOne = ({customStyle}) => {
    return (
        <Accordion className={`rn-accordion-style ${customStyle}`} defaultActiveKey="0">
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    What is Doob ? How does it work?
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>Welcome to Doob React Creative Agency, React Portfolio and Corporate Multi Purpose Template Built With React JS. NO jQuery!. </Card.Body>
                </Accordion.Collapse>
            </Card>

            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    How can I run doob react template?
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>You can run doob easily. First You'll need to have node and npm on your machine. So Please open your command prompt then check your node -v and npm -v Version. Goes To Your your command prompt: then First: npm install

                    At Last: npm run start. By the following way you can be run your project easily.</Card.Body>
                </Accordion.Collapse>
            </Card>

            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    How can I get the customer support?
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                    <Card.Body>After purchasing the product need you any support you can be share with us with sending mail to rainbowit10@gmail.com.</Card.Body>
                </Accordion.Collapse>
            </Card>

            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    Can I get update regularly and For how long do I get updates?
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                    <Card.Body>Yes, We will get update the Trydo. And you can get it any time. Next time we will comes with more feature. You can be get update for unlimited times. Our dedicated team works for update.</Card.Body>
                </Accordion.Collapse>
            </Card>

        </Accordion>
    )
}
export default AccordionOne

