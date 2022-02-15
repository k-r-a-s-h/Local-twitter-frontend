import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useState } from 'react'

function User({ id,firstName, lastName, email, isFollowing,followUser,unfollowUser }) {
    const [isLoading, setisLoading] = useState(false)
    const showButton = ()=>{
        if(isFollowing){
            return<Button size ='lg' className = 'float-end' variant="danger" disabled={isLoading} onClick={(event)=>{setisLoading(true);unfollowUser(id);setisLoading(false)}}>Unfollow</Button>
        }
        else{
            return <Button size ='lg' className = 'float-end' variant="primary" disabled={isLoading} onClick={(event)=>{setisLoading(true);followUser(id);setisLoading(false)}}>Follow</Button>
        }
    }
    return (
        <Card className='m-3'>
            <Card.Body>
                <Container>
                    <Row>
                        <Col xs={4} md={2} lg={2} xxl={2}>
                            <Image src={'https://avatars.dicebear.com/api/initials/' + firstName + ' ' + lastName + '.svg'} width={50}
                                height={50} thumbnail fluid></Image>
                        </Col>
                        <Col>
                            <Card.Title>{firstName + " " + lastName}</Card.Title>
                            <Card.Subtitle className="text-muted">Email: {email}</Card.Subtitle>
                        </Col>
                        <Col >
                            {showButton()}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default User