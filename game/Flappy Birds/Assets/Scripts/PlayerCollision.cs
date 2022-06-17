using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerCollision : MonoBehaviour
{
    public PlayerMovement movement;
    public Text Score;
    public GameObject EndScreen;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnCollisionEnter(Collision collisionInfo)
    {
        if (collisionInfo.collider.tag == "Enemy") {
            Debug.Log("Dead");
            movement.enabled = false;
            FindObjectOfType<GameManager>().EndGame();
            EndScreen.SetActive(true);


        }

    }

    void OnTriggerEnter(Collider colliderInfo)
    {
        if (colliderInfo.name == "Coin")
        {
            Debug.Log("Coin");
            Score.text = (int.Parse(Score.text) + 1).ToString();
            Debug.Log(Score.text);

        }
    }

}
