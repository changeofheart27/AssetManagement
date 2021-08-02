package com.nashtech.assetmanagementwebservice.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "asset")
public class Asset {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "asset_code", unique = true, nullable = false)
	private String assetCode;
	
	@Column(name = "asset_name")
	private String assetName;
	
	@Column(name = "specification")
	private String specification;
	
	@Column(name = "installed_date")
	@Temporal(TemporalType.DATE)
	private Date installedDate;
	
	@Column(name = "state")
	private int state;
	
	@Column(name = "location")
	private String location;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@OneToOne(mappedBy = "category", fetch = FetchType.EAGER)
	private Category category;

	public Asset() {
		super();
	}

	public Asset(int id, String assetCode, String assetName, String specification, Date installedDate, int state,
			String location, User user) {
		super();
		this.id = id;
		this.assetCode = assetCode;
		this.assetName = assetName;
		this.specification = specification;
		this.installedDate = installedDate;
		this.state = state;
		this.location = location;
		this.user = user;
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

	public Date getInstalledDate() {
		return installedDate;
	}

	public void setInstalledDate(Date installedDate) {
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
