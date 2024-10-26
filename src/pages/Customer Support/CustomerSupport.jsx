import React, { useState, useEffect } from "react";
import { getAllTicketsByCustomerId, createTicket, deleteTicket } from "../../api/customerSupport";
import styles from './styles';

const CustomerSupport = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({
      description: "",
      priority: "MEDIUM", // Set default priority to MEDIUM
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("OPEN");
    const [showPopup, setShowPopup] = useState(false);
  
    const customerId = localStorage.getItem("userId");
    const customerName = localStorage.getItem("username");
  
    useEffect(() => {
      fetchTickets();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      const filterTickets = () => {
        if (filterStatus === "ALL") {
          setFilteredTickets(tickets);
        } else {
          setFilteredTickets(tickets.filter(ticket => ticket.status === filterStatus));
        }
      };
      
      filterTickets();
    }, [tickets, filterStatus]);

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const fetchedTickets = await getAllTicketsByCustomerId(customerId);
        setTickets(fetchedTickets);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const handleNewTicketChange = (e) => {
      const { name, value } = e.target;
      setNewTicket((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmitNewTicket = async (e) => {
      e.preventDefault();
      try {
        await createTicket({
          ...newTicket,
          customerId,
          customerName,
        });
        setNewTicket({ description: "", priority: "MEDIUM" }); // Reset to default MEDIUM priority
        fetchTickets(); // Refresh the ticket list
        setShowPopup(true); // Show the pop-up
        setTimeout(() => setShowPopup(false), 3000); // Hide the pop-up after 3 seconds
      } catch (err) {
        setError("Failed to create ticket. Please try again.");
      }
    };
  
    const handleDeleteTicket = async (ticketId) => {
      try {
        await deleteTicket(ticketId);
        fetchTickets(); // Refresh the ticket list
      } catch (err) {
        setError("Failed to delete ticket. Please try again.");
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Customer Support</h1>

        <h2 style={styles.subHeading}>Create New Ticket</h2>
        <form onSubmit={handleSubmitNewTicket} style={styles.form}>
          <textarea
            name="description"
            value={newTicket.description}
            onChange={handleNewTicketChange}
            placeholder="Describe your issue..."
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Submit Ticket</button>
        </form>

        {showPopup && (
          <div style={styles.popup}>
            Ticket created successfully!
          </div>
        )}

        <h2 style={styles.subHeading}>Your Tickets</h2>
        <div style={styles.filterContainer}>
          <label htmlFor="filter-status">Filter by status: </label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.select}
          >
            <option value="ALL">All</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
        {filteredTickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <ul style={styles.ticketList}>
            {filteredTickets.map((ticket) => (
              <li key={ticket.ticketId} style={styles.ticketItem}>
                <div style={styles.ticketHeader}>
                  <h3 style={styles.ticketTitle}>Ticket #{ticket.ticketId}</h3>
                  <span style={{
                    ...styles.ticketStatus,
                    backgroundColor: ticket.status === 'OPEN' ? '#2ecc71' : '#95a5a6'
                  }}>
                    {ticket.status}
                  </span>
                </div>
                <p style={styles.ticketInfo}><span style={styles.label}>Priority:</span> {ticket.priority}</p>
                <p style={styles.ticketInfo}><span style={styles.label}>Description:</span> {ticket.description}</p>
                <p style={styles.ticketInfo}><span style={styles.label}>Created:</span> {new Date(ticket.createdDate).toLocaleString()}</p>
                {ticket.updatedDate && (
                  <p style={styles.ticketInfo}><span style={styles.label}>Updated:</span> {new Date(ticket.updatedDate).toLocaleString()}</p>
                )}
                {ticket.resolution && <p style={styles.ticketInfo}><span style={styles.label}>Resolution:</span> {ticket.resolution}</p>}
                <button onClick={() => handleDeleteTicket(ticket.ticketId)} style={styles.deleteButton}>
                  Delete Ticket
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default CustomerSupport;