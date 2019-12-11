import React, { Component } from 'react';
import { elementsEN } from './elementsEN';
import { elementsPT } from './elementsPT';
import Element from './Element';
// import Detail from './Detail';
import br from './images/br.png';
import us from './images/us.png';
import { Row, Col, Container } from 'reactstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            modal: false,
            element: {
                name: "",
                summary: "",
                symbol: "",
                category: "",
                number: "",
                source: "",
                appearance: "",
                atomic_mass: "",
                molar_heat: "",
                density: "",
                melt: "",
                boil: "",
                shells: []
            },
            elementsEN: elementsEN,
            elementsPT: elementsPT,
            title: "",
            subtitle: "",
            languague: "en"
        };

    }

    state = {
        showInfo: false,
        element: {}
    };

    showInfo = (data) => {
        this.setState({ showInfo: true, element: data, modal: !this.state.modal});
    };

    setLanguage = (e, lang) => {
        
        let languageOptions = document.querySelectorAll('.language');

        languageOptions[0].classList.remove('language-primary');
        languageOptions[1].classList.remove('language-primary');

        e.target.classList.add('language-primary');
        
        if (this.state.languague !== lang){
            this.setState({
                showInfo: true,
                languague: lang,
                element: {}
            });
        }
    }

    render() {

        let cell = []
        let shells = []
        let key = 0;

        let content = this.state.elementsEN;
        let elementShells = this.state.element.shells;

        this.state.title = "Periodic Table";
        this.state.subtitle = "Developed by ";

        if (this.state.languague == 'pt'){
            this.state.title = "Tabela Periodica";
            this.state.subtitle = "Desenvolvido por ";
            content = this.state.elementsPT;
        }

        document.title = this.state.title;

        if (elementShells) {
            for (let shell = 0; shell < elementShells.length; shell++)
               shells.push(<div key={shell}>{elementShells[shell]}</div>)
        }

        for (let row = 0; row < content.length; row++, key++) {

            for (let col = 0; col < content[row].length; col++, key++)
                cell.push(<Element showInfo={this.showInfo} data={content[row][col]} key={key} />)
        }

        return (
            <div>
                <header className="header"> 
                    <Container>
                        <Row>
                            <Col xs="9">
                                <h1>{this.state.title}</h1>
                            </Col>
                            <Col xs="3">
                                <img onClick={(e) => this.setLanguage(e, "en")} className="float-right language language-primary" src={us} />
                                <img onClick={(e) => this.setLanguage(e, "pt")} className="float-right language" src={br} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <small>{this.state.subtitle}Daniel Muniz</small>
                            </Col>
                        </Row>
                    </Container>    
                </header>
                <div className="wrapper">
                    <Row>
                        <Col xs="12">
                            <div id="table">
                                {cell}

                                {/* <Detail data={this.state.element} /> */}
                                
                                {/* <Information data={this.state.element} /> */}

                                <div id="element-box" className={this.state.element.category ? `shadow ${this.state.element.category}` : ''} >
                                    <Row>
                                        <Col xs="8">
                                            <Col xs="7">
                                                <div className="symbol">
                                                    {this.state.element.symbol}
                                                </div>
                                            </Col>
                                            <Col xs="5">
                                                <div className="number">
                                                    {this.state.element.number}
                                                </div>
                                            </Col>
                                            <Col xs="12">
                                                <div className="element-name">
                                                    {this.state.element.name}
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col xs="4">
                                            <div id="shells">
                                                {shells}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div id="information" className="style-2">
                                    {this.state.element.summary}
                                </div>
                                <div id="details" className="mt-2">
                                    <span className="shadow mr-2 badge badge-primary badge-pill">
                                        {this.state.element.category}
                                    </span> 
                                    <span className="shadow mr-2 badge badge-info badge-pill">
                                        {this.state.element.phase}
                                    </span>
                                </div> 
                            </div>
                        </Col>
                    </Row>
                </div>

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col xs="5">
                                <h5>
                                    Essa merda foi Desenvolvida por mim e somente eu mais ninguem alem de mim sozinho eu fiz sem a ajuda de ninguem
                                </h5>
                                </Col>
                            <Col xs="2"></Col>

                            <Col xs="5">
                                   Discord
                                   Gmail
                                   Linkedin
                                   Git
                            </Col>
                        </Row>
                        {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div> */}
                    </Container>
                </footer>
            </div>
        );
    }
}

export default App;
