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
      setSelectedSeats(selectedSeats.filter(s => s.row !== row || s.seat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, { row, seat }]);
    }
  }

  useEffect(() => {
    let totalPrice = 0;
    selectedSeats.forEach(s => {
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


function renderSeat(row, seat) {
  let  flattenedSeats =[]
  try{
    flattenedSeats = seats.flat()
  }catch(err){
    console.log(err)
    flattenedSeats = seats
  }
    
    const isBooked = flattenedSeats.find(s => s.row === row && s.seat === seat);
    const isSelected = selectedSeats.find(s => s.row === row && s.seat === seat);
    const seatColor = isBooked ? 'Sold' : isSelected ? 'Selected' : 'Available';
    return (
        
    <td key={seat} className={seatColor}>
          <input
           className='seats'
            type="button"
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
      <div className="container">
    <div className="w3ls-reg">
    
        <ul className="seat_w3ls">
            <li className="smallBox greenBox">Sold Seats</li>

            <li className="smallBox redBox">Selected Seats</li>

            <li className="smallBox emptyBox">Available Seats</li>
        </ul>
   
    <div className="seatStructure txt-center" style={{"overflow-x":"auto;"}}>
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
        </table>

        <div className="screen">
            <h2 className="wthree">Screen this way</h2>
        </div>
        <button onClick={handleSubmit}>Book Tickets</button>
        <div  className="wthree" style={{"margin-top":"20px"}}>
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
