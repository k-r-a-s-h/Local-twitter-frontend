import { Card, Container, Row, Col, Image } from 'react-bootstrap'
function Post({ firstName, lastName, id, content, userid, createdAt}) {
    const dateFormatting = (data)=>{
        let date = new Date(data) 
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()
        let dateString = day + ' '+ months[month] + ' ' + year;
        return dateString 
     }
    return (
        <Card className='m-3'>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={4} md={2} lg={2} xxl={2}>
                            <Image src={'https://avatars.dicebear.com/api/initials/' +firstName+' '+lastName +'.svg'} width={100}
                                height={100} thumbnail fluid></Image>
                        </Col>
                        <Col>
                            <Card.Title>{firstName+" "+lastName}</Card.Title>
                            <Card.Subtitle className="text-muted">Posted on : {dateFormatting(createdAt)}</Card.Subtitle>
                            <Card.Text>
                                {content}
                            </Card.Text>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default Post