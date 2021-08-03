package com.nashtech.assetmanagementwebservice.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.service.AssetService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1")
public class AssetController {
	private final AssetService assetService;
	private static final Logger logger = LoggerFactory.getLogger(AssetController.class);
	
	@Autowired
	public AssetController(AssetService assetService) {
		this.assetService = assetService;
	}
	
	@ApiOperation(value = "GET Request To Get All Assets", response = AssetDTO.class, 
    		responseContainer = "List")
    @GetMapping(value = "/assets", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AssetDTO>> getAllAssets() {
    	List<AssetDTO> assets = assetService.getAssetList();
        return ResponseEntity.ok(assets);
    }
	
	@ApiOperation(value = "GET Request To Find A Post Using id", response = AssetDTO.class)
    @GetMapping(value = "/assets/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AssetDTO> getAsset(@PathVariable Integer id) {
    	AssetDTO asset = assetService.findAssetById(id);
        if (asset == null) {
        	return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(asset);
    }
	
	@ApiOperation(value = "POST Request To Create A New Asset", response = AssetDTO.class)
    @PostMapping(value = "/assets", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AssetDTO> createAsset(@RequestBody AssetDTO payload) {
		AssetDTO result = assetService.createAsset(payload.getCategory().getId(), payload);
		return ResponseEntity.ok(result);
	}
}
