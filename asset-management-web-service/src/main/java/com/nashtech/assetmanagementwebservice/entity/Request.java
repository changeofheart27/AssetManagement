package com.nashtech.assetmanagementwebservice.entity;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "request")
public class Request {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "accepted_by")
    private String username;

    @OneToOne
    @JoinColumn(name = "assignment_id", referencedColumnName = "id")
    private Assignment assignment;

    @Column(name = "returned_date")
    private LocalDate returned_date;

    @Column(name = "state")
    private int state;

    public void setReturned_date(LocalDate returned_date) {
        this.returned_date = returned_date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getReturned_date() {
        return returned_date;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
