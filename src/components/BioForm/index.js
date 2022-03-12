import React, { Component } from 'react'
import { ImageCrop } from '../../ImageCrop'
import Biofield from './BioField'
import './style.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
export default class Bioform extends Component {
  constructor(props) {
    super(props)
    this.containerRef = React.createRef()
    this.state = {
      mhide: null,
      pages: 1,
      contentHeight: 0,
      bio_fields: [
        {
          name: "Name",
          value: ""
        },
        {
          name: "Date Of Birth",
          value: ""
        },
        {
          name: "Place Of Birth",
          value: ""
        },
        {
          name: "Time Of Birth",
          value: ""
        },
        {
          name: "Father's Name",
          value: ""
        },
        {
          name: "Father's Occupation",
          value: ""
        },
        {
          name: "Mother's Name",
          value: ""
        },
        {
          name: "Mother's Occupation",
          value: ""
        },
        {
          name: "Height",
          value: ""
        },
        {
          name: "Weight",
          value: ""
        },
        {
          name: "Education",
          value: ""
        },
        {
          name: "Job/Occupation",
          value: ""
        },
        {
          name: "Contact Number",
          value: ""
        },
        {
          name: "Address",
          value: ""
        },
      ]
    }
  }
  componentDidMount() {
    if(sessionStorage.getItem("bio_fields")!== null) {
      this.setState({bio_fields: JSON.parse(sessionStorage.getItem("bio_fields"))})
    }
    let that = this
    if (window.outerWidth <= 768) {
      document.getElementById("printarea").style.transform = "translateX(-25%) translateY(-25%) scale(49%)";
      setTimeout(function () {
        document.getElementById("printarea").style.transform = "none";
      }, 3000)
    }
    document.addEventListener("click", function(e) {
      if ((document.getElementById('field' + that.state.mhide)!==null) && document.getElementById('field' + that.state.mhide).contains(e.target)){
        // Clicked in box
      } else {
        that.setState({mhide: null})
      }
    })
  }
  toggleIcon = (e, index) => {
    console.log(index)
    this.setState({ mhide: index })
    console.log(this.state.mhide)
    if( !document.querySelectorAll('#field' + index + " article")[0].contains(e.target)) {
      document.querySelectorAll('#field' + index + " article")[1].focus()
    }
  }
  addField = (index) => {
    let new_field = {
      name: "",
      value: ""
    }
    let bio_fields = [...this.state.bio_fields]
    bio_fields.splice(index + 1, 0, new_field)
    this.setState({ bio_fields: bio_fields, pages: Math.ceil(bio_fields.length / 18) })
  }
  removeField = (index) => {
    let bio_fields = [...this.state.bio_fields]
    if (bio_fields.length > 1) {
      bio_fields.splice(index, 1)
      this.setState({ bio_fields: bio_fields })
    }
  }

  handleDragEnd = (result) => {
    console.log(result.source, result.destination)
    if (!result.destination) { return }
    let items = Array.from(this.state.bio_fields)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    this.setState({ bio_fields: items, mhide: null })
  }
  handleChange = (e, option, idx) => {
    console.log("options", option, e, idx)
    let items = Array.from(this.state.bio_fields)
    if (option === "value") {
      items[idx].value = e.target.value
    }
    else {
      items[idx].name = e.target.value
    }
    this.setState({ bio_fields: items })
  }
  printDiv = () => {
    sessionStorage.setItem("bio_fields", JSON.stringify(this.state.bio_fields))
    let cwindow = window
    var printContents = document.getElementsByTagName('html')[0].innerHTML;

    let myWindow=window.open('','Print Window');
    cwindow.focus()
    myWindow.document.write(printContents);
    myWindow.print(); 
    myWindow.close()
    window.location.reload()

    // document.body.innerHTML = originalContents;
  }

  render() {
    let pages = Math.ceil(this.state.bio_fields.length / 18)
    let bfields = this.state.bio_fields.map((field, idx) => {
      field.index = idx
      return field
    })
    console.log(bfields)
    return (
      <>
        <div className='bio-actions pnone dhide' >
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                Save as PDF
              </Tooltip>
            }
          >
            <div className='bio-download action' onClick={this.printDiv}>
              <img className='mhide' src="/assets/images/download-black.svg" alt="download" />
              <img className='dhide' src="/assets/images/download-white.svg" alt="download" />
            </div>
          </OverlayTrigger>
        </div>
        <div style={{ position: "relative" }} id="printarea">

          {/* <div className='mt-3 pageno'>Total Pages: {this.state.pages}</div> */}
          <DragDropContext onDragEnd={this.handleDragEnd}>
            {
              [...Array(pages)].map((page, pidx) => (
                <div className={'bio-page page-' + (pidx + 1)} key={pidx}>
                  {
                    pidx === 0 && (<>
                      <div className='bio-actions pnone mhide' >
                        <OverlayTrigger
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Tooltip id={`tooltip-bottom`}>
                              Save as PDF
                            </Tooltip>
                          }
                        >
                          <div className='bio-download action' onClick={this.printDiv}>
                            <img className='mhide' src="/assets/images/download-black.svg" alt="download" />
                            <img className='dhide' src="/assets/images/download-white.svg" alt="download" />
                          </div>
                        </OverlayTrigger>
                      </div></>)
                  }
                  <img src='/assets/images/border-1.png' alt='back-img' className='back-img' />
                  <Droppable droppableId={pidx.toString()}>
                    {(provider) => (
                      <div className='page-content' id={"page" + (pidx + 1)} {...provider.droppableProps} ref={provider.innerRef}>
                        {
                          bfields.filter((item, idx) => ((idx >= (pidx * 18)) && (idx < (pidx + 1) * 18))).map((field, index) => (
                            <Draggable id={field.index} draggableId={field.index.toString()} index={field.index} key={field.index}>
                              {(provider) => (
                                <div {...provider.draggableProps} ref={provider.innerRef} {...provider.dragHandleProps}>
                                  <div className={(index < 8 && pidx === 0) ? "small-width dcursor field-flex" : "field-flex full-width dcursor"}>
                                    <Biofield
                                      field_name={field.name}
                                      field_value={field.value}
                                      addField={this.addField}
                                      removeField={this.removeField}
                                      findex={field.index}
                                      handleChange={(e, option) => this.handleChange(e, option, field.index)}
                                      color="main"
                                      mhide={this.state.mhide}
                                      toggleIcon={this.toggleIcon}
                                    />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        }
                        {provider.placeholder}
                        {
                          pidx === 0 && (<><ImageCrop /></>)
                        }
                      </div>
                    )}
                  </Droppable>
                </div>
              ))
            }
          </DragDropContext>
        </div>
      </>
    )
  }
}
