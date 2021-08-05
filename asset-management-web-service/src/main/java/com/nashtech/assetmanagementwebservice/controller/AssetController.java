package com.nashtech.assetmanagementwebservice.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.service.AssetService;
import io.swagger.annotations.ApiOperation;


@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class AssetController {
	private final AssetService assetService;
	private static final Logger logger = LoggerFactory.getLogger(AssetController.class);
	
	@Autowired
	public AssetController(AssetService assetService) {
		this.assetService = assetService;
	}
	
	@ApiOperation(value = "Get All Assets", response = AssetDTO.class, 
    		responseContainer = "List")
    @GetMapping(value = "/assets", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AssetDTO>> getAllAssets() {
		logger.info("Execute getAllAssets() inside AssetController");
        List<AssetDTO> assets = assetService.getAssetList();
        logger.info("Executed successful!");
        return ResponseEntity.ok(assets);
    }
	
	@ApiOperation(value = "Get An Asset Using id", response = AssetDTO.class)
    @GetMapping(value = "/assets/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AssetDTO> getAsset(@PathVariable Integer id) {
		logger.info("Execute getAsset() inside AssetController");
        AssetDTO asset = assetService.findAssetById(id);
        if (asset == null) {
            return ResponseEntity.notFound().build();
        }
        logger.info("Executed successful!");
        return ResponseEntity.ok(asset);
    }
	
	@ApiOperation(value = "Create A New Asset", response = AssetDTO.class)
    @PostMapping(value = "/assets", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AssetDTO> createAsset(@RequestBody AssetDTO payload) {
		logger.info("Execute createAsset() inside AssetController");
		AssetDTO result = assetService.createAsset(payload.getCategoryDTO().getId(), payload);
		logger.info("Executed successful!");
		return ResponseEntity.ok(result);
	}
	
	@ApiOperation(value = "Update An Asset Using id", response = AssetDTO.class)
    @PutMapping(value = "/assets/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AssetDTO> updateAsset(@PathVariable Integer id, @RequestBody AssetDTO payload) {
		logger.info("Execute updateAsset() inside AssetController");
		AssetDTO asset = assetService.editAsset(id, payload);
		logger.info("Executed successful!");
    	return ResponseEntity.ok(asset);
    }
	
	@ApiOperation(value = "Delete An Asset Using id")
    @DeleteMapping(value = "/assets/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> deleteAsset(@PathVariable Integer id) {
		logger.info("Execute deleteAsset() inside AssetController");
    	assetService.deleteAssetById(id);
    	logger.info("Executed successful!");
        return ResponseEntity.ok().build();
    }

	@ApiOperation(value = "Get An Asset Using assetCode", response = AssetDTO.class)
	@GetMapping(value = "/assets/assetcode/{assetCode}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AssetDTO> findAssetByAssetCode(@PathVariable String assetCode) {
		AssetDTO asset = assetService.findAssetByAssetCode(assetCode);
		return ResponseEntity.ok(asset);
	}

	@ApiOperation(value = "Get An Asset Using assetName", response = AssetDTO.class)
	@GetMapping(value = "/assets/assetname/{assetName}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<AssetDTO>> findAssetByAssetName(@PathVariable String assetName) {
		List<AssetDTO> assets = assetService.findAssetByAssetName(assetName);
		return ResponseEntity.ok(assets);
	}
}
