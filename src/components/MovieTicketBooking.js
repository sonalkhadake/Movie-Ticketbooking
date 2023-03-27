import React, { useState, useEffect } from 'react';

function MovieTicketBooking() {
  const [seats, setSeats] = useState(JSON.parse(localStorage.getItem('bookedSeats')));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedSeats = JSON.parse(localStorage.getItem('bookedSeats'));
   const a = localStorage.getItem("bgcolor");
   console.log(a, storedSeats )

    if (storedSeats) {
      setSeats(storedSeats);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bgcolor", "red");
    localStorage.setItem('bookedSeats', JSON.stringify([...seats]));
  }, [seats]);

  function handleSeatClick(row, seat) {
    const seatIndex = selectedSeats.findIndex(s => s.row === row && s.seat === seat);
    if (seatIndex >= 0) {
      // Seat is already selected, so remove it from the list of selected seats
      setSelectedSeats(selectedSeats.filter(s => s.row !== row || s.seat !== seat));
    } else {
      // Seat is not selected, so add it to the list of selected seats
      setSelectedSeats([...selectedSeats, { row, seat }]);
    }
  }

  useEffect(() => {
    let totalPrice = 0;
    console.log('>>>total price',totalPrice )
    selectedSeats.forEach(s => {
        console.log('>>>inside foreach',s.seat,selectedSeats )
      if (s.row >= 'A' && s.row <= 'C') {
        totalPrice += 150;
        console.log("a to c", totalPrice)
      } else if (s.row >= 'D' && s.row <= 'G') {
        totalPrice += 200;
      } else if (s.row >= 'H' && s.row <= 'J') {
        totalPrice += 250;
      }
    });
    setTotalPrice(totalPrice);

  }, [selectedSeats]);

  function handleSubmit() {
    setSeats([selectedSeats, ...seats]);
    setSelectedSeats([]);
    
    alert(`You have booked ${selectedSeats.length} seats: ${JSON.stringify(selectedSeats)}`);
  }

//   function renderSeat(row, seat) {
//     console.log("seats",seats)
//     const flattenedSeats = seats.flat();
//     const isBooked = flattenedSeats.find(s => s.row === row && s.seat === seat);
//     // const isBooked = seats.find(s => s.row === row && s.seat === seat);
//     console.log("isBooked", isBooked)
//     const isSelected = selectedSeats.find(s => s.row === row && s.seat === seat);
//     const seatColor = isBooked ? 'green' : isSelected ? 'gray' : 'white';
//     return (
//       <button
//         key={seat}
//         onClick={() => handleSeatClick(row, seat)}
//         disabled={isBooked}
//         style={{ backgroundColor: seatColor }}
//       >
//         {seat}
//       </button>
//     );
//   }
function renderSeat(row, seat) {
    const flattenedSeats = seats.flat();
    const isBooked = flattenedSeats.find(s => s.row === row && s.seat === seat);
    const isSelected = selectedSeats.find(s => s.row === row && s.seat === seat);
    const seatColor = isBooked ? 'Sold' : isSelected ? 'Selected' : 'Available';
    return (
        
    //   <td key={seat} style={{ backgroundColor: seatColor }}>
    <td key={seat} className={seatColor}>
       
          <input
           className='seats'
            type="button"
            // value={`${seat}`}
            onClick={() => handleSeatClick(row, seat)}
            disabled={isBooked}
            checked={isSelected}
          />
          
   
      </td>
    );
  }
  function renderRow(row) {
    const seats = [];
    for (let i = 1; i <= 12; i++) {
        
      seats.push(renderSeat(row, i));
    }
    return (
      <tr key={row}>

        <td> {row}</td>

        {seats}
      </tr>
    );
  }
  
  const rows = [];
  for (let i = 65; i <= 74; i++) {
    rows.push(renderRow(String.fromCharCode(i)));
  }
  
  return (
    <>
    
      <h1>Movie Seat Selection</h1>
    {/* <div className="container">

        <div className="w3ls-reg">
          
            <ul className="seat_w3ls">
                <li className="smallBox greenBox">Selected Seat</li>

                <li className="smallBox redBox">Reserved Seat</li>

                <li className="smallBox emptyBox">Empty Seat</li>
            </ul>
        <div className="seatStructure txt-center" >
                <table id="seatsBlock">
                    <p id="notification"></p>
   
          <tbody>{rows}</tbody>
        </table>
        </div>
        <button onClick={handleSubmit}>Book Tickets</button>
      </div>
      <div>
        <p>Total Price: {totalPrice} Rs</p>
      </div>
      </div> */}
      <div class="container">

<div class="w3ls-reg">
  
    <ul class="seat_w3ls">
        <li class="smallBox greenBox">Sold Seats</li>

        <li class="smallBox redBox">Selected Seats</li>

        <li class="smallBox emptyBox">Available Seats</li>
    </ul>
   
    <div class="seatStructure txt-center" style={{"overflow-x":"auto;"}}>
        <table id="seatsBlock">
            <p id="notification"></p>
            <tr>

                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
            </tr>
            {rows}
            {/* <tr>
                <td>A</td>
                <td>
                    <input type="checkbox" class="seats" value="A1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A5"/>
                </td>
                <td class="seatGap"></td>
                <td>
                    <input type="checkbox" class="seats" value="A6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="A12"/>
                </td>
            </tr>

            <tr>
                <td>B</td>
                <td>
                    <input type="checkbox" class="seats" value="B1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="B6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="B12"/>
                </td>
            </tr>

            <tr>
                <td>C</td>
                <td>
                    <input type="checkbox" class="seats" value="C1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="C6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="C12"/>
                </td>
            </tr>

            <tr>
                <td>D</td>
                <td>
                    <input type="checkbox" class="seats" value="D1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="D6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="D12"/>
                </td>
            </tr>

            <tr>
                <td>E</td>
                <td>
                    <input type="checkbox" class="seats" value="E1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="E6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="E12"/>
                </td>
            </tr>

            <tr class="seatVGap"></tr>

            <tr>
                <td>F</td>
                <td>
                    <input type="checkbox" class="seats" value="F1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="F6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="F12"/>
                </td>
            </tr>

            <tr>
                <td>G</td>
                <td>
                    <input type="checkbox" class="seats" value="G1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="G6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="G12"/>
                </td>
            </tr>

            <tr>
                <td>H</td>
                <td>
                    <input type="checkbox" class="seats" value="H1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="H6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="H12"/>
                </td>
            </tr>

            <tr>
                <td>I</td>
                <td>
                    <input type="checkbox" class="seats" value="I1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="I6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="I12"/>
                </td>
            </tr>

            <tr>
                <td>J</td>
                <td>
                    <input type="checkbox" class="seats" value="J1"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J2"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J3"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J4"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J5"/>
                </td>
                <td></td>
                <td>
                    <input type="checkbox" class="seats" value="J6"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J7"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J8"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J9"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J10"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J11"/>
                </td>
                <td>
                    <input type="checkbox" class="seats" value="J12"/>
                </td>
            </tr> */}
        </table>

        <div class="screen">
            <h2 class="wthree">Screen this way</h2>
        </div>
        <button onClick={handleSubmit}>Book Tickets</button>
        <div  class="wthree" style={{"margin-top":"20px"}}>
        <button>Total Price: {totalPrice} Rs</button>
      </div>
    </div>
  
    
   
</div>
</div>
      
    </>
  );
  































//   function renderRow(row) {
//     const seats = [];
//     for (let i = 1; i <= 12; i++) {
//       seats.push(renderSeat(row, i));
//     }
//     return (
//       <div key={row}>
//         <div>Row {row}</div>
//         <div>{seats}</div>
//       </div>
//     );
//   }

//   const rows = [];
//   for (let i = 65; i <= 74; i++) {
//     rows.push(renderRow(String.fromCharCode(i)));
//   }

//   return (
//     <>
//       <div>
//         <h1>Movie Ticket Booking</h1>
//         <div>{rows}</div>
//         <button onClick={handleSubmit}>Book Tickets</button>
//       </div>
//       <div>
//         <p>Total Price: {totalPrice} Rs</p>
//       </div>
      
//     </>
//   );
}

export default MovieTicketBooking;
