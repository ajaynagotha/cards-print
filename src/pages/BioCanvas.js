import React, { Component } from 'react'
import Bioform from '../components/BioForm/index'

export default class BioCanvas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mainColor: "#750606"
        }
    }

    render() {
        return (
            <div className="mrg-card">
                <div className="container bcontainer">
                    <div className="mrg-main" style={{ color: this.state.mainColor }}>
                        <div className="mrg-form">
                            <Bioform />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
