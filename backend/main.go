package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	deepSeekURL = "https://api.deepseek.com/v1/chat/completions"
)

var apiKey = "sk-c78133ea78654a60a5e3e53fadba415d"

type MindmapRequest struct {
	Topic string `json:"topic" binding:"required"`
}

type DeepSeekRequest struct {
	Model    string        `json:"model"`
	Messages []ChatMessage `json:"messages"`
}

type ChatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type DeepSeekResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func main() {
	r := gin.Default()

	r.POST("/generate-mindmap", generateMindmapHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

func generateMindmapHandler(c *gin.Context) {
	var req MindmapRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	prompt := fmt.Sprintf(`Generate a complete ECharts mindmap JSON structure about '%s' with these requirements:

1. Format:
- Must be valid JSON that can be directly used with ECharts
- Follow this exact structure:

{
  "series": [{
    "type": "graph",
    "layout": "force",
    "data": [
      { "name": "Concept Principal", "symbolSize": 70, "itemStyle": { "color": "#4F46E5" }, "category": 0 },
      { "name": "Domaine 1", "symbolSize": 50, "itemStyle": { "color": "#8B5CF6" }, "category": 1 },
      { "name": "Sous-concept A", "symbolSize": 35, "itemStyle": { "color": "#EC4899" }, "category": 2 }
    ],
    "links": [
      { "source": "Concept Principal", "target": "Domaine 1" },
      { "source": "Domaine 1", "target": "Sous-concept A" }
    ],
    "categories": [
      { "name": "Concept Principal" },
      { "name": "Domaines" },
      { "name": "Sous-concepts" }
    ],
    "force": {
      "repulsion": 300,
      "edgeLength": 120
    }
  }]
}

2. Content Requirements:
- 1 main concept (symbolSize: 70)
- 3-5 primary domains (symbolSize: 50)
- 3-5 sub-concepts per domain (symbolSize: 35)
- Include relevant tools/libraries (symbolSize: 30, color: #F59E0B)
- All names in French

3. Response Must:
- Be pure JSON with no extra text
- Include all categories and force parameters
- Have valid connections between nodes

4. Color Scheme:
- Main: #4F46E5 (indigo)
- Domains: #8B5CF6 (purple)
- Sub-concepts: #EC4899 (pink)
- Tools: #F59E0B (amber)
- Technologies: #10B981 (green)

Generate only the JSON with no additional commentary.`, req.Topic)

	mindmapJSON, err := callDeepSeekAPI(prompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Parse the cleaned JSON to ensure it's valid
	var jsonData interface{}
	if err := json.Unmarshal([]byte(mindmapJSON), &jsonData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": fmt.Sprintf("Invalid JSON after cleaning: %v", err),
		})
		return
	}

	// Return the parsed JSON
	c.JSON(http.StatusOK, jsonData)
}

func callDeepSeekAPI(prompt string) (string, error) {
	requestBody := DeepSeekRequest{
		Model: "deepseek-chat",
		Messages: []ChatMessage{
			{
				Role:    "user",
				Content: prompt,
			},
		},
	}

	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return "", fmt.Errorf("error marshaling request body: %v", err)
	}

	req, err := http.NewRequest("POST", deepSeekURL, bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", fmt.Errorf("request creation error: %v", err)
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("HTTP request error: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("error reading response body: %v", err)
	}

	var responseData DeepSeekResponse
	err = json.Unmarshal(body, &responseData)
	if err != nil {
		return "", fmt.Errorf("error parsing JSON response: %v", err)
	}

	if len(responseData.Choices) == 0 {
		return "", fmt.Errorf("no choices found in response")
	}

	// Clean the response by removing all non-JSON content
	cleanContent := cleanJSONResponse(responseData.Choices[0].Message.Content)

	// Verify the cleaned content is valid JSON
	if !json.Valid([]byte(cleanContent)) {
		return "", fmt.Errorf("invalid JSON after cleaning: %s", cleanContent)
	}

	return cleanContent, nil
}

func cleanJSONResponse(raw string) string {
	// Remove all markdown formatting
	clean := strings.Trim(raw, "`")
	clean = strings.ReplaceAll(clean, "```json", "")
	clean = strings.ReplaceAll(clean, "```", "")

	// Remove the word "json" if it appears at the start
	clean = strings.TrimPrefix(clean, "json")
	clean = strings.TrimPrefix(clean, "JSON")

	// Remove any other non-JSON text before the opening {
	re := regexp.MustCompile(`^[^{]*`)
	clean = re.ReplaceAllString(clean, "")

	// Trim whitespace
	clean = strings.TrimSpace(clean)

	return clean
}
