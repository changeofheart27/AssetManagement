package com.nashtech.assetmanagementwebservice.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "asset")
public class Asset {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "asset_code", unique = true)
	private String assetCode;
	
	@Column(name = "asset_name")
	private String assetName;
	
	@Column(name = "specification")
	private String specification;
	
	@Column(name = "installed_date")
	private LocalDate installedDate;
	
	@Column(name = "state")
	private int state;
	
	@Column(name = "location")
	private String location;
	
	@ManyToOne()
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne()
	@JoinColumn(name = "category_id")
	private Category category;

	public Asset() {
		super();
	}
	
	//used for testing purpose (JUnit)
	public Asset(int id, String assetName, String specification, LocalDate installedDate, int state, 
			String location) {
		this.id = id;
		this.assetName = assetName;
		this.specification = specification;
		this.installedDate = installedDate;
		this.state = state;
		this.location = location;
	}

	public Asset(String assetName, String specification, LocalDate installedDate, int state, 
			String location, Category category) {
		super();
		this.assetName = assetName;
		this.specification = specification;
		this.installedDate = installedDate;
		this.state = state;
		this.location = location;
		this.category = category;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAssetCode() {
		return assetCode;
	}

	public void setAssetCode(String assetCode) {
		this.assetCode = assetCode;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public String getSpecification() {
		return specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	public LocalDate getInstalledDate() {
		return installedDate;
	}

	public void setInstalledDate(LocalDate installedDate) {
		this.installedDate = installedDate;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
	
	
}
