import React, { Fragment } from "react";
import { Card, Row, Col, Divider, Space, Typography } from 'antd';

const style = { background: '#0092ff', padding: '8px 0' };
const { Meta } = Card;
const { Paragraph } = Typography;
const article =
      "If you only read the books that everyone else is reading.  you can only think what everyone else is thinking";

function About(props) {
    return(
        <Fragment>
            <div>
                <p className="heading-large primary">About Us</p>
            </div>
                <Divider></Divider>
                <Row>
                    <Space size={56}>
                        <Col>
                            <Card hoverable
                                style={{ width: 260 }}>
                                <Meta title="Our History!" 
                                description=<p>Started in 2020, Bookie is an online book rental and selling system,
                                                where you can buy any kind book just create account.<br/>
                                                If you have any spare books you can also sell/rent them here.</p>
                                                    />
                            </Card>
                        </Col>
                    <Col>
                        <Card hoverable
                             style={{ width: 260 }}>
                            <Meta title="Some facts about us" 
                                description=<p>Cheaper Rates!<br/>
                                             Operated in Pakistan!<br/>
                                             Free For All!<br/>
                                             You can also sell/rent books!<br/>
                                             Students can save a lot of money by renting expensive books!<br/>
                                             Making unavailable books in the market, available on our platform!</p> />
                        </Card>
                    </Col>

                    <Col>
                        <Card hoverable
                             style={{ width: 260 }}>
                            <Meta title="Why Choose Us?" 
                                description=<p>People used to face many problems in finding and getting books they want.<br/>
                                            Wastage of time going to different shops.<br/>
                                            Have to travel a lot if book is not available nearby.<br/>
                                            Don’t have enough money to buy expensive books (Mostly for students that just have to consult a particular book for just 1 semester).<br/>
                                            Can’t find the particular book they want anywhere.</p>
                                            />
                        </Card>
                    </Col>
                </Space>
            </Row>
                 <Divider></Divider>
                 <Row>
                    <Col>
                    <Paragraph
                        ellipsis={{
                        expandable: true,
                        suffix: '--Haruki Murakami',
                        onEllipsis: ellipsis => {
                        console.log('Ellipsis changed:', ellipsis);
                    },
                }}
                        title={`${article}--Haruki Murakami`}
                        >
                        {article}
                    </Paragraph>
                </Col>
                </Row>
                 <Divider></Divider>
        </Fragment>
    );
}
export default About; 
