import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import './style.css'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class Biofield extends Component {
    constructor(props) {
        super(props)
        this.contentEditable1 = React.createRef();
        this.contentEditable2 = React.createRef();
        this.state = {
            html1: " ",
            html2: "Enter Information"
        };
    }
    componentDidMount() {
        this.setState({ html1: `<b>${this.props.field_name}</b>` })
    }

    toggleIcon = (e, index) => {
        console.log("pencil click", e, index)
        document.getElementById("field" + index).click()
    }

    render() {
        return (
            <div className={"bio-field " + this.props.color} id={"field" + this.props.findex} onClick={(e) => this.props.toggleIcon(e, this.props.findex)}>
                <div className="action-btn mhide pnone">
                    <OverlayTrigger
                        key="bottom-1"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom-1`}>
                                Add field
                            </Tooltip>
                        }
                    >
                        <div className='action'>
                            <img className='action-normal' src="/assets/images/add-icon.svg" onClick={() => { this.props.addField(this.props.findex) }} alt="add-field" />
                            <img className='action-bold' src="/assets/images/add-icon-bold.svg" onClick={() => { this.props.addField(this.props.findex) }} alt="add-field" />
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key="bottom-2"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom-2`}>
                                Drag to move
                            </Tooltip>
                        }
                    >
                        <div className='action'>
                            <img className='move-field action-normal' src="/assets/images/move-icon.svg" alt="move-field" />
                            <img className='move-field action-bold' src="/assets/images/move-icon-bold.svg" alt="move-field" />
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="action-btn dhide pnone">
                    <OverlayTrigger
                        key="bottom-1"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom-1`} className="mhide">
                                Add field
                            </Tooltip>
                        }
                    >
                        <div className='action'>
                            <img className='action-normal' src="/assets/images/add-icon.svg" onClick={() => { this.props.addField(this.props.findex) }} alt="add-field" />
                            <img className='action-bold' src="/assets/images/add-icon-bold.svg" onClick={() => { this.props.addField(this.props.findex) }} alt="add-field" />
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key="bottom-2"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom-2`} className="mhide">
                                Drag to move
                            </Tooltip>
                        }
                    >
                        <div className='action'>
                            <img className='move-field action-normal' src="/assets/images/move-icon.svg" alt="move-field" />
                            <img className='move-field action-bold' src="/assets/images/move-icon-bold.svg" alt="move-field" />
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="action-btn edit dhide pnone" style={{ opacity: (this.props.mhide === this.props.findex) ? 0 : 1 }} onClick={(e) => this.toggleIcon(e, this.props.findex)}>
                    <OverlayTrigger
                        key="bottom-1"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-bottom-1`} className="mhide">
                                Add field
                            </Tooltip>
                        }

                    >
                        <div className='action'>
                            <img className='action-normal' src="/assets/images/pencil-icon.svg" onClick={() => { this.props.addField(this.props.findex) }} alt="add-field" />
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="field-flex field">
                    <ContentEditable
                        innerRef={this.contentEditable1}
                        html={this.props.field_name}
                        placeholder="New Field"
                        disabled={false}       // use true to disable editing
                        onChange={(e) => this.props.handleChange(e, "name")} // handle innerHTML change
                        tagName='article' // Use a custom HTML tag (uses a div by default)
                    />
                    {
                        !this.props.field_name && (<div className='bio-placeholder'>Edit Field</div>)
                    }
                </div>
                <div className="value">
                    <div className="field-flex">
                        <ContentEditable
                            innerRef={this.contentEditable2}
                            html={this.props.field_value} // innerHTML of the editable div
                            disabled={false}       // use true to disable editing
                            onChange={(e) => this.props.handleChange(e, "value")} // handle innerHTML change
                            tagName='article' // Use a custom HTML tag (uses a div by default)
                            tabIndex={this.props.findex + 1}
                        />
                        {
                            !this.props.field_value && (<div className='bio-placeholder'>Enter Information</div>)
                        }
                        <div className="action-btn-right mhide pnone">
                            <OverlayTrigger
                                key="bottom-3"
                                placement="bottom"
                                overlay={
                                    <Tooltip id={`tooltip-bottom-3`}>
                                        Delete field
                                    </Tooltip>
                                }
                            >
                                <div className='action'>
                                    <img className='action-normal' src="/assets/images/remove-icon.svg" alt="remove-field" onClick={() => { this.props.removeField(this.props.findex) }} />
                                    <img className='action-bold' src="/assets/images/remove-icon-bold.svg" alt="remove-field" onClick={() => { this.props.removeField(this.props.findex) }} />
                                </div>
                            </OverlayTrigger>
                        </div>
                        <div className="action-btn-right dhide pnone">
                            <OverlayTrigger
                                key="bottom-3"
                                placement="bottom"
                                overlay={
                                    <Tooltip id={`tooltip-bottom-3`}>
                                        Delete field
                                    </Tooltip>
                                }
                            >
                                <div className='action'>
                                    <img className='action-normal' src="/assets/images/remove-icon.svg" alt="remove-field" onClick={() => { this.props.removeField(this.props.findex) }} />
                                    <img className='action-bold' src="/assets/images/remove-icon-bold.svg" alt="remove-field" onClick={() => { this.props.removeField(this.props.findex) }} />
                                </div>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Biofield