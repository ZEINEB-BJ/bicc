package com.shopsense.controller;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopsense.model.Complaint;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    @Autowired
    private com.shopsense.service.EmailService emailService;
    @PostMapping("/admin/notify")
    public ResponseEntity<Map<String, String>> notifyAdmin(@RequestBody Complaint complaint) {
        // Compose email body with complaint details
        String subject = "Nouvelle réclamation client";
        String body = "<b>Nouvelle réclamation reçue :</b><br>"
            + "<b>Nom:</b> " + complaint.getCustomerName() + "<br>"
            + "<b>Email:</b> " + complaint.getCustomerEmail() + "<br>"
            + "<b>Adresse:</b> " + complaint.getCustomerAddress() + "<br>"
            + "<b>Sujet:</b> " + complaint.getSubject() + "<br>"
            + "<b>Description:</b> " + complaint.getDescription() + "<br>";
        emailService.sendContentEmail("biccmanager2025@gmail.com", subject, body);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Notification envoyée à l'admin");
        return ResponseEntity.ok(response);
    }

    @PostMapping
        public ResponseEntity<Map<String, String>> submitComplaint(@RequestBody Complaint complaint) {
            // Logic to handle the complaint
            Map<String, String> response = new HashMap<>();
            response.put("message", "Complaint submitted successfully");
            return ResponseEntity.ok(response);
    }
}